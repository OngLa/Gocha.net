package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.car.CarResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.Car;
import kosa.afnica.backend.db.entity.CarType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CarMapper {
    // Brand 저장
    void saveBrand(Brand brand);

    // 모든 Brand 조회
    List<Brand> findAllBrand();

    // CarType 저장
    void saveCarType(CarType carType);

    // BrandId를 기반으로 모든 CarType 조회
    List<CarType> findAllCarTypeByBrandId(Long brandId);

    // 내 차량 등록
    void saveCar(Car car);

    // MemberId를 기반으로 모든 CarId, CartypeName, Car Photo 조회
    List<CarResDto> findAllCarByMemberId(Long memberId);

    // CarId 기반으로 등록된 차량 삭제
    void deleteById(Long id);

    // CarId를 해당 Car 삭제
    Optional<Car> findById(Long id);

}
