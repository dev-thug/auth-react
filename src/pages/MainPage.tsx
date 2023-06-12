import HomeAdmin from "components/organisms/home/HomeAdmin";
import HomeUser from "components/organisms/home/HomeUser";
import MainTemplate from "components/templates/MainTemplate";
import { Role } from "stores/AuthStore";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/Context";

const MainPage = () => {
  const { authStore } = useStores();

  console.log(authStore.payload?.role);
  return (
    <MainTemplate>
      {authStore.payload?.role === Role.admin ? <HomeAdmin /> : <HomeUser />}
    </MainTemplate>
  );
};

export default observer(MainPage);
