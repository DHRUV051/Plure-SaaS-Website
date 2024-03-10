"use client";

import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import CustomeModal from "../global/custom-modal";
import UploadMediaForm from "../forms/upload-media";

type Props = {
  subaccountId: string;
};

function MediaUploadButton({ subaccountId }: Props) {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomeModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomeModal>
        );
      }}
    >
      Upload
    </Button>
  );
}

export default MediaUploadButton;
