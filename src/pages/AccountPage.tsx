import { useEffect, useState } from "react";

import Account from "components/organisms/Account";
import MainTemplate from "components/templates/MainTemplate";
import { observer } from "mobx-react-lite";

const AccountPage = () => {
  return (
    <MainTemplate>
      <Account />
    </MainTemplate>
  );
};

export default observer(AccountPage);
