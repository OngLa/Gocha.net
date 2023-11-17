package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.carData.CarDataResDto;

public interface CarDataService {

    // Map<String, Long> createCarData();

    // CarId 기반으로 모든 자동차 데이터 불러오기
    CarDataResDto findAllCarDataByCarId(Long carId);


}
