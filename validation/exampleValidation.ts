import * as Yup from "yup";
import { getNearConfig } from "../lib/near";

// Learn more about Object schema validation https://github.com/jquense/yup
const exampleValidation = Yup.object().shape({
  amount_deposit: Yup.number().max(
    Yup.ref("balance"),
    `You dont have enough stNEAR. Visit <a href='${getNearConfig().metapoolUrl}' target="blank"> Metapool </a> to get more.`
  ),
});

export default exampleValidation;
