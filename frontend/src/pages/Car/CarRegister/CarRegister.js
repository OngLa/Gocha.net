import { useEffect, useState } from "react";
import { getBrands, getCarTypes, postCar } from "../../../service/car";
import Swal from "sweetalert2";

export function CarRegister() {
  const [isLoading, setIsLoading] = useState(true);
  const [bToggle, setBToggle] = useState(true);
  const [cToggle, setCToggle] = useState(false);
  const [brands, setBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [carNumber, setCarNumber] = useState();

  // 렌더링 시, brandList 출력하기
  useEffect(() => {
    const work = async () => {
      try {
        setIsLoading(true);

        const brandsData = await getBrands();
        setBrands(brandsData);
      } finally {
        setIsLoading(false);
        setBToggle(true);
        setCToggle(false);
      }
    };

    work();
  }, []);

  // brandList 선택 시, CarTypeList 출력하기
  useEffect(() => {
    const work = async () => {
      try {
        const carTypeData = await getCarTypes(brands[selectedBrand].id);
        setCarTypes(carTypeData);
      } finally {
        setSelectedCar("");
        setBToggle(!bToggle);
        setCToggle(true);
      }
    };

    if (!(selectedBrand === undefined || selectedBrand === "")) {
      work();
    }
  }, [selectedBrand]);

  const handleCarNumber = (e) => {
    setCarNumber(e.target.value);
  };

  // 차량 등록
  const handleCarInfo = async () => {
    const data = {
      carNumber: carNumber,
      cartypeId: carTypes[selectedCar].id,
    };

    try {
      await postCar(data);
    } finally {
      Swal.fire({
        title: "차량이 등록 되었습니다.",
        text: `${carNumber}, ${carTypes[selectedCar].name}}`,
        icon: "question",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then(async (result) => {});
    }
  };
}
