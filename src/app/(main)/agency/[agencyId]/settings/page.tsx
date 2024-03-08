import AgencyDetails from "@/components/forms/agency-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import userDetails from "@/components/forms/user-details";

type Props = {
  params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: { email: authUser.emailAddresses[0].emailAddress },
  });

  if (!userDetails) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  const subAccount = agencyDetails.SubAccount;

  return (
    <div className="flex ld:!flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <userDetails
        type="agency"
        id={params.agencyId}
        subAccount={subAccount}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingsPage;
