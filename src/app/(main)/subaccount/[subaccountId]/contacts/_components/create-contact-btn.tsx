"use client";

import ContactUserForm from "@/components/forms/contact-user-form";
import CustomeModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";

type Props = {
  subaccountId: string;
};

const CraeteContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();

  const handleCreateContact = () => {
    setOpen(
      <CustomeModal
        title="Create or Update Contact Information"
        subheading="Contacts are like customers."
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomeModal>
    );
  };

  return <Button className="mt-2 w-fit ml-5 md:ml-0" onClick={handleCreateContact}>Create Contact</Button>;
};

export default CraeteContactButton;
