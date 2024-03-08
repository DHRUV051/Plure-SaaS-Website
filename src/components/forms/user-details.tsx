'use client';

import { UserWithPermissionsAndSubAccounts } from '@/lib/types'
import { SubAccount, User } from '@prisma/client'
import { useState } from 'react'

type Props = {
    id: string | null
    type: "agency" | "subaccount",
    userData? : Partial<User>
    subAccounts: SubAccount[]
}

const userDetails = ({ id, type, userData, subAccounts }: Props) => {
    const [subAccountPermissions, setSubAccountPermissions] = useState<UserWithPermissionsAndSubAccounts>(null)
  return (
    <div>userDetails</div>
  )
}

export default userDetails