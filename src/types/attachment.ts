export interface Attachment {
  id: string;
  name: string;
  contentType: string;
  size: number;
  isInline: boolean;
  contentUrl?: string;
  contentBytes?: string;
  contentId?: string;
}
