

export class UploadPdfEvent {
  businessPlanGenerationId: string;
  businessPlanRequestId: string;
  markdown: string;
}

export class NewTestEvent {
  constructor(public message: string) {}
}
