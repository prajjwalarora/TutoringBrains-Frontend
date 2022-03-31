import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Room from "../components/room/Room";
// import Header from "../components/ui/header/Header";

const RoomPage = () => {
  return (
    <>
      {/* <Header isSticky={true} /> */}
      <Switch>
        <Route path="/room/:roomId">
          <Room />
        </Route>
      </Switch>
    </>
  );
};

export default RoomPage;
