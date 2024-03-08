import { getAuthUserDetails } from "@/lib/queries";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return;
  const details =
    type === "agency"
      ? user?.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  return <div>hi</div>;
};

export default Sidebar;
