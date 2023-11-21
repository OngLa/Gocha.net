package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import kosa.afnica.backend.db.entity.CarData;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CarDataMapper {

    // 자동차 데이터 DB에 저장하기
    void saveCarData(CarData carData);

    // 자동차 데이터 업데이트
    void updateCarData(CarData carData);

    // CarId, 오늘 날짜 기반 DB에 저장된 값이 있는지 조회
    Optional<CarData> findByCarIdAndLastUpdate(Long carId);

    // CarId 기반으로 최신 자동차 데이터 불러오기
    Optional<CarData> findRecentCarDataByCarId(Long carId);

    // CarId 기반으로 모든 자동차 데이터 불러오기
    List<CarData> findAllCarDataByCarId(CarDataReqDto reqDto);

}
