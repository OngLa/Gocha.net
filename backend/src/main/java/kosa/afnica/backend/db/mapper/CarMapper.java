package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.CarType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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
}
