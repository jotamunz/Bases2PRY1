export interface RouteDetailed {
  name?: string;
  isActive?: boolean;
  schemeName?: string;
  authors?: { userId: string }[];
  approvers?: { userId: string }[];
  requiredApprovals?: Number;
  requiredRejections?: Number;
}
