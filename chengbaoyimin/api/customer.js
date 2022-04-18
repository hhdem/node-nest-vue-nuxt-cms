import { apiHelper } from "../plugins/axios";

export default {
  saveCustomer(customer) {
    return await apiHelper.post(`/customers`, customer);
  },
};
