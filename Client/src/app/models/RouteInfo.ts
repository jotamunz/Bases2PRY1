export interface RouteInfo {
  name?: string;
  currentApprovals?: number;
  currentRejections?: number;
  requiredApprovals?: number;
  requiredRejections?: number;
  decisions?: [
    {
      approverName?: string;
      decision?: number;
      decisionName?: string;
      approvalDate?: string;
    }
  ];
}
