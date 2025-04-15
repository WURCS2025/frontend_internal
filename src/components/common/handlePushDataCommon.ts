import { FileStatus } from "../../models/FileStatus"
import { STATUS_OPTIONS_LIST, PUSH_DATA_URL } from "../../constants";

interface HandlePushDataProps {
  fileId: string;
  files: FileStatus[];
  setFiles: (files: FileStatus[]) => void;
  confirm: (params: { title: string; description: string }) => Promise<boolean | void>;
}

export const handlePushDataCommon = async ({
  fileId,
  files,
  setFiles,
  confirm,
}: HandlePushDataProps): Promise<void> => {
  console.log("Push data for", fileId);

  const file = files.find((f) => f.id === fileId);
  if (!file) {
    console.error("File not found");
    return;
  }

  try {
    const response = await fetch(`${PUSH_DATA_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileId),
    });

    if (!response.ok) {
      console.error("Failed to push message to SNS");
      return;
    }

    const returnFile: FileStatus = await response.json();
    console.log("Response from SNS:", returnFile);

    await confirm({
      title: "Message Sent Successfully",
      description: `${returnFile.filename} was sent to data processing successfully.`,
    });

    // ✅ Update the file status locally
    const updated = files.map((f) =>
      f.id === fileId ? { ...f, status: STATUS_OPTIONS_LIST[2] } : f
    );
    setFiles(updated);
  } catch (error) {
    console.error("Error sending message to SNS:", error);
  }
};
