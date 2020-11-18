export interface RouteInfo {
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
