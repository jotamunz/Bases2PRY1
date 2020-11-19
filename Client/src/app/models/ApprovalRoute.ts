import { User } from './User';

export interface ApprovalRoute {
  name?: string;
  schemeName?: string;
  requiredApprovals?: number;
  requiredRejections?: number;
  authors?: User[];
  approvers?: User[];
}
