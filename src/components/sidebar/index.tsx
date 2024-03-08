import { getAuthUserDetails } from "@/lib/queries"

type Props={
    id: string,
    type: 'agency' | 'subaccount',
}

const index = async({id,type}:Props) => {
    
    const user = await getAuthUserDetails();
    if(!user) return null;

    return (
    <div>   

    </div>
  )
}

export default index