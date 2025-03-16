export const ADMIN_ROLE = "SUPER ADMIN"
export const USER_ROLE = "NORMAL USER"
export const INIT_PERMISSIONS = [
  // 🏷 Users Module
  { name: "Get Users", apiPath: "/api/v1/users", method: "GET", module: "USERS" },
  { name: "Get Users (Paginated)", apiPath: "/api/v1/users?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "USERS" },
  { name: "Get User by ID", apiPath: "/api/v1/users/:id", method: "GET", module: "USERS" },
  { name: "Create User", apiPath: "/api/v1/users", method: "POST", module: "USERS" },
  { name: "Update User", apiPath: "/api/v1/users/:id", method: "PATCH", module: "USERS" },
  { name: "Delete User", apiPath: "/api/v1/users/:id", method: "DELETE", module: "USERS" },
  // 🏢 Companies Module
  { name: "Get Companies", apiPath: "/api/v1/companies", method: "GET", module: "COMPANIES" },
  { name: "Get Companies (Paginated)", apiPath: "/api/v1/companies?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "COMPANIES" },
  { name: "Get Company by ID", apiPath: "/api/v1/companies/:id", method: "GET", module: "COMPANIES" },
  { name: "Create Company", apiPath: "/api/v1/companies", method: "POST", module: "COMPANIES" },
  { name: "Update Company", apiPath: "/api/v1/companies/:id", method: "PATCH", module: "COMPANIES" },
  { name: "Delete Company", apiPath: "/api/v1/companies/:id", method: "DELETE", module: "COMPANIES" },

  // 💼 Jobs Module
  { name: "Get Jobs", apiPath: "/api/v1/jobs", method: "GET", module: "JOBS" },
  { name: "Get Jobs (Paginated)", apiPath: "/api/v1/jobs?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "JOBS" },
  { name: "Get Job by ID", apiPath: "/api/v1/jobs/:id", method: "GET", module: "JOBS" },
  { name: "Create Job", apiPath: "/api/v1/jobs", method: "POST", module: "JOBS" },
  { name: "Update Job", apiPath: "/api/v1/jobs/:id", method: "PATCH", module: "JOBS" },
  { name: "Delete Job", apiPath: "/api/v1/jobs/:id", method: "DELETE", module: "JOBS" },

  // 🎭 Roles Module
  { name: "Get Roles", apiPath: "/api/v1/roles", method: "GET", module: "ROLES" },
  { name: "Get Roles (Paginated)", apiPath: "/api/v1/roles?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "ROLES" },
  { name: "Get Role by ID", apiPath: "/api/v1/roles/:id", method: "GET", module: "ROLES" },
  { name: "Create Role", apiPath: "/api/v1/roles", method: "POST", module: "ROLES" },
  { name: "Update Role", apiPath: "/api/v1/roles/:id", method: "PATCH", module: "ROLES" },
  { name: "Delete Role", apiPath: "/api/v1/roles/:id", method: "DELETE", module: "ROLES" },

  // 🛑 Permissions Module
  { name: "Get Permissions", apiPath: "/api/v1/permissions", method: "GET", module: "PERMISSIONS" },
  { name: "Get Permissions (Paginated)", apiPath: "/api/v1/permissions?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "PERMISSIONS" },
  { name: "Get Permission by ID", apiPath: "/api/v1/permissions/:id", method: "GET", module: "PERMISSIONS" },
  { name: "Create Permission", apiPath: "/api/v1/permissions", method: "POST", module: "PERMISSIONS" },
  { name: "Update Permission", apiPath: "/api/v1/permissions/:id", method: "PATCH", module: "PERMISSIONS" },
  { name: "Delete Permission", apiPath: "/api/v1/permissions/:id", method: "DELETE", module: "PERMISSIONS" },

  // 📄 Resumes Module
  { name: "Get Resumes", apiPath: "/api/v1/resumes", method: "GET", module: "RESUMES" },
  { name: "Get Resumes (Paginated)", apiPath: "/api/v1/resumes?page=:current&pageSize=:limit&qs=:qs", method: "GET", module: "RESUMES" },
  { name: "Get Resume by ID", apiPath: "/api/v1/resumes/:id", method: "GET", module: "RESUMES" },
  { name: "Create Resume", apiPath: "/api/v1/resumes", method: "POST", module: "RESUMES" },
  { name: "Update Resume", apiPath: "/api/v1/resumes/:id", method: "PATCH", module: "RESUMES" },
  { name: "Delete Resume", apiPath: "/api/v1/resumes/:id", method: "DELETE", module: "RESUMES" },
  { name: "Get Resume by User", apiPath: "/api/v1/resumes/by-user", method: "POST", module: "RESUMES" }
];
