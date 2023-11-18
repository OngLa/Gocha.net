package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;

import java.util.List;


public interface CarDataService {

    // 자동차 데이터 DB에 저장하기
    void createCarData(CarDataReqDto reqDto);

    // CarId 기반으로 최신 자동차 데이터 불러오기
    CarDataResDto findRecentCarDataByCarId(Long carId);

    // CarId 기반으로 모든 자동차 데이터 불러오기
    List<CarDataResDto> findAllCarDataByCarId(CarDataReqDto reqDto);

}
