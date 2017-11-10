import React, {PropTypes} from 'react'

import Authorized, {SUPERADMIN_ROLE} from 'src/auth/Authorized'

import Dropdown from 'shared/components/Dropdown'
import SlideToggle from 'shared/components/SlideToggle'

import {USER_ROLES} from 'src/admin/constants/dummyUsers'
import {USERS_TABLE} from 'src/admin/constants/chronografTableSizing'

const OrgTableRow = ({
  user,
  organization,
  onChangeUserRole,
  onChangeSuperAdmin,
}) => {
  const {
    colRole,
    colSuperAdmin,
    colProvider,
    colScheme,
    colActions,
  } = USERS_TABLE

  const currentRole = user.roles.find(
    role => role.organization === organization.id
  )

  return (
    <tr className={'chronograf-admin-table--user'}>
      <td>
        <strong>
          {user.name}
        </strong>
      </td>
      <td style={{width: colRole}}>
        <span className="chronograf-user--role">
          <Dropdown
            items={USER_ROLES.map(r => ({
              ...r,
              text: r.name,
            }))}
            selected={currentRole.name}
            onChoose={onChangeUserRole(user, currentRole)}
            buttonColor="btn-primary"
            buttonSize="btn-xs"
            className="dropdown-stretch"
          />
        </span>
      </td>
      <Authorized requiredRole={SUPERADMIN_ROLE}>
        <td style={{width: colSuperAdmin}} className="text-center">
          <SlideToggle
            active={user.superAdmin}
            onToggle={onChangeSuperAdmin(user, user.superAdmin)}
            size="xs"
          />
        </td>
      </Authorized>
      <td style={{width: colProvider}}>
        {user.provider}
      </td>
      <td style={{width: colScheme}}>
        {user.scheme}
      </td>
      <td className="text-right" style={{width: colActions}} />
    </tr>
  )
}

const {func, shape, string} = PropTypes

OrgTableRow.propTypes = {
  user: shape(),
  organization: shape({
    name: string.isRequired,
    id: string.isRequired,
  }),
  onChangeUserRole: func.isRequired,
  onChangeSuperAdmin: func.isRequired,
}

export default OrgTableRow