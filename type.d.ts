// Define Enums
enum EmployeeRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

enum Source {
  OTHER = "OTHER",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  GOOGLE = "GOOGLE",
  FRIEND = "FRIEND"
}

enum ProjectRole {
  SUPERVISOR = "SUPERVISOR",
  FIELD_AGENT = "FIELD_AGENT",
  GUEST = "GUEST",
  MANAGER = "MANAGER",
}

// Define Types
type User = {
  id: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  role: UserRole;
  source: Source;
  passwordResetToken?: string | null;
  passwordResetAt?: Date | null;
  employees: Employee[];
  organizations: Organization[];
  createdAt: Date;
  updatedAt: Date;
};

type Subscription = {
  id: string;
  name: string;
  slug: string;
  numberOfOrgs: string;
  numberOfEmployees: string;
  numberOfProjects: string;
  numberOfForms: string;
  numberOfSubmissions: string;
  offlineSubmission: boolean;
  price?: Price | null;
};

type Price = {
  id: string;
  amount: number;
  testId?: string | null;
  productionId?: string | null;
  subscriptionId: string;
  subscription: Subscription;
};

type Organization = {
  id: string;
  name: string;
  logo?: string | null;
  address?: string | null;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  stripeCurrentPeriodEnd?: Date | null;
  employees: Employee[];
  forms: Form[];
  invite: Invite[];
  projects: Project[];
  reports: Report[];
  submissions: Submission[];
  userId: string;
  user: User;
};

type Employee = {
  id: string;
  fullName?: string | null | undefined;
  email?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  avatar?: string | null;
  role: EmployeeRole;
  userId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  organization: Organization;
  user: User;
  projectAssociations: EmployeeProjectAssociation[];
  projects: Project[];
  forms: Form[];
  reports: Report[];
  submissions: Submission[];
  invite: Invite[];
};

type Invite = {
  id: string;
  token: string;
  email: string;
  inviteCode?: string | null;
  role: EmployeeRole;
  expirationDate: Date;
  organizationId: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
  organization: Organization;
  employee: Employee;
};

type Project = {
  id: string;
  name: string;
  description: string;
  expectedDuration: string;
  status: string;
  isCompleted: boolean;
  startDate: Date;
  endDate: Date;
  creatorId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  projectAssociations: EmployeeProjectAssociation[];
  forms: Form[];
  creator: Employee;
  organization: Organization;
  reports: Report[];
  submissions: Submission[];
};

type EmployeeProjectAssociation = {
  id: string;
  employeeId: string;
  projectId: string;
  role: ProjectRole;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  project: Project;
};

type Form = {
  id: string;
  title: string;
  formData: string;
  description: string;
  published: boolean;
  visits: number;
  subCount: number;
  creatorId: string;
  organizationId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  organization: Organization;
  project: Project;
  submissions: Submission[];
};

type Submission = {
  id: string;
  title: string;
  description: string;
  submissionData: string;
  formData: string;
  geolocation?: string | null;
  creatorId: string;
  organizationId: string;
  formId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  form: Form;
  employee: Employee;
  organization: Organization;
  project: Project;
};

type Report = {
  id: string;
  title: string;
  reportData: string;
  creatorId: string;
  organizationId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  organization: Organization;
  project: Project;
};

type Audit = {
  id: string;
  userMail: string;
  ipAddress?: string | null;
  orgId: string;
  type: string;
  tableName: string;
  dateTime: Date;
  oldValues: string;
  newValues: string;
  rowId: string;
};

type Feedback = {
  id: string;
  name: string;
  email: string;
  rating? : string;
  title: string;
  comment: string;
  createdAt: Date;
}

// ========================== RESPONSES ========================

interface SuccessfulEResponse {
  success: true;
  data: IEmployeeUpdateProfileResponse;
}

interface FailedResponse {
  success: false;
  error: string;
}

// ========================== AUTH ========================

interface ISignInForm {
  email: string;
  password: string;
}

interface ISignUpForm {
  email: string;
  password: string;
  source: string;
}

// SIGN IN
type UserInfo = {
  createdAt: string;
  email: string;
  id: string;
  role: string;
  stripeCurrentPeriodEnd: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeSubscriptionId: string;
  organizations: [];
};

interface ISignInResponse {
  access_token: string;
  userInfo: UserInfo;
}

interface SuccessfulSignInResponse extends SuccessfulEResponse {
  success: true;
  data: ISignInResponse;
}

type SignInResponse = SuccessfulSignInResponse | FailedResponse;

// ===================== SIGN UP =====================
interface ISignUpResponse {
  message: string;
}

interface SuccessfulSignUpResponse extends SuccessfulEResponse {
  success: true;
  data: ISignUpResponse;
}

type SignUpResponse = SuccessfulSignUpResponse | FailedResponse;

// ========================= Organisation ===========================
interface ICreateOrganisationForm {
  name: string;
  logo?: string;
}
interface ICreateOrgResponse {
  address: string;
  createdAt: string;
  id: string;
  inviteCode: string;
  logo: string;
  name: string;
  updatedAt: string;
  userId: string;
}

interface SuccessfulCreateOrgResponse extends SuccessfulEResponse {
  success: true;
  data: ICreateOrgResponse;
}

type CreateOrgResponse = SuccessfulCreateOrgResponse | FailedResponse;

// ========================= Employee ===========================
interface IEmployeeRole {
  OWNER: "OWNER";
  ADMIN: "ADMIN";
  MEMBER: "MEMBER";
  GUEST: "GUEST";
}

interface IEmployee {
  fullName: string;
  email: string;
  contactNumber: string;
  address: string;
  avatar?: string;
  role?: IEmployeeRole;
  userId?: string;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IEmployeeSelfUpdate {
  fullName: string;
  email?: string;
  contactNumber: string;
  address: string;
  avatar?: string;
  role?: IEmployeeRole;
  userId?: string;
}

interface IEmployeeUpdateProfile extends IEmployee {}

interface IEmployeeUpdateProfileResponse {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  address: string;
  avatar: string;
  role: string;
  userId: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

interface SuccessfulEmployeeUpdateProfileResponse extends SuccessfulEResponse {
  data: IEmployeeUpdateProfileResponse;
}

type EmployeeUpdateProfileResponse =
  | SuccessfulEmployeeUpdateProfileResponse
  | FailedResponse;

//  ===================== ORGANISATION ======================
interface IOrganisation {
  id: string;
  name: string;
  email: string;
  logo: string;
  address: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: string;
  userId: string;
}
interface IUserOrgs extends IOrganisation {
  employees: Employee[];
}

interface SuccessfulUserOrgsResponse extends SuccessfulEResponse {
  data: IUserOrgs;
}

type UserOrgsResponse = SuccessfulUserOrgsResponse | FailedResponse;
