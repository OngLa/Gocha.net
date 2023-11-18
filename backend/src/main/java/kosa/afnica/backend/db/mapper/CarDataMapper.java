package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.CarData;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarDataMapper {

    // 자동차 데이터 DB에 저장하기
    void saveCarData(CarData carData);

    // CarId 기반으로 모든 자동차 데이터 불러오기
    List<CarData> findAllCarDataByCarId(Long carId);

}
