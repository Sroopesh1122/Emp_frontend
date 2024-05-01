import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";
import UpdateEmp from "../pages/employee/UpdateEmp";

const UpdateWrapper = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState('');

  useEffect(() => {
    const getEmpData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`${baseUrl}/emp/${id}`);
        setData(res.data)
      } catch (error) {
        const {data}= error.response;
        toast.error(data?.message)
      } finally {
        setIsLoading(false)
      }
    };
    getEmpData()
  }, [id]);

  // const { isLoading,isFetching, data } = useQuery("getEmp", getEmpData, {
  //   refetchInterval:0,
  //   onError: (error) => {
  //     const { data } = error.response;
  //     toast.error(data?.message);
  //   },
  // });

  if (isLoading) {
    return <h1>Loading.......</h1>;
  }
  if (data) {
    return <UpdateEmp data={data} />;
  }
};

export default UpdateWrapper;
