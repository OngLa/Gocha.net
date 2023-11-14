package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.car.CarTypeResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.CarType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    // Brand 추가
    void createBrand(MultipartFile file, Brand brand);

    // Brand 조회
    List<BrandResDto> findAllBrand();

    // CarType 추가
    void createCarType(MultipartFile file, CarType carType);

    // brandId값 기반으로 CarType 조회
    List<CarTypeResDto> findAllCarTypeByBrandId(Long brandId);

}
