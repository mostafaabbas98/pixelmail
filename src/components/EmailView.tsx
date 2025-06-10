import type { EmailMessage } from "../types/email";

export const EmailView = ({
  selectedEmail,
}: {
  selectedEmail: EmailMessage | null;
}) => {
  console.log(selectedEmail);
  return (
    <div className="w-7/12 bg-white flex flex-col">
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">Email View</h1>
      </div>
    </div>
  );
};
