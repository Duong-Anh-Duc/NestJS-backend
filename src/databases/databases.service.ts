import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    constructor(
        @InjectModel(User.name)
        private userModel : SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel : SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel : SoftDeleteModel<RoleDocument>,

        private configService : ConfigService,
        private userService : UsersService
    ){}
    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT");
    
        if (Boolean(isInit)) {
            console.log("🔄 Đang kiểm tra dữ liệu...");
    
            // Dùng Promise.all() để giảm thời gian chờ
            const [countUser, countPermission, countRole] = await Promise.all([
                this.userModel.countDocuments(),
                this.permissionModel.countDocuments(),
                this.roleModel.countDocuments()
            ]);
    
            // 1️⃣ Khởi tạo Permission nếu chưa có
            if (countPermission === 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
                console.log("✅ Đã khởi tạo Permissions");
            }
    
            // 2️⃣ Khởi tạo Role nếu chưa có
            if (countRole === 0) {
                const permissions = await this.permissionModel.find({}).select("_id");
                await this.roleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: "Admin có toàn bộ quyền",
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: "Người dùng thông thường",
                        isActive: true,
                        permissions: []
                    }
                ]);
                console.log("✅ Đã khởi tạo Roles");
            }
    
            // 3️⃣ Khởi tạo User nếu chưa có
            if (countUser === 0) {
                const [adminRole, userRole] = await Promise.all([
                    this.roleModel.findOne({ name: ADMIN_ROLE }),
                    this.roleModel.findOne({ name: USER_ROLE })
                ]);
    
                await this.userModel.insertMany([
                    {
                        name: "I'm Admin",
                        email: "admin@gmail.com",
                        password: this.userService.hashPassWord(this.configService.get<string>('INIT_PASSWORD')),
                        age: 69,
                        gender: "MALE",
                        address: "Vietnam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm Hoi Dan IT",
                        email: "hoidanit@gmail.com",
                        password: this.userService.hashPassWord(this.configService.get<string>('INIT_PASSWORD')),
                        age: 96,
                        gender: "MALE",
                        address: "Vietnam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm Normal User",
                        email: "user@gmail.com",
                        password: this.userService.hashPassWord(this.configService.get<string>('INIT_PASSWORD')),
                        age: 65,
                        gender: "MALE",
                        address: "Vietnam",
                        role: userRole?._id
                    }
                ]);
                console.log("✅ Đã khởi tạo Users");
            }
    
            // 4️⃣ Kiểm tra xem dữ liệu đã được tạo đủ chưa
            if (countPermission > 0 && countRole > 0 && countUser > 0) {
                console.log("🎉 Dữ liệu đã sẵn sàng!");
            }
        }
    }
    
}