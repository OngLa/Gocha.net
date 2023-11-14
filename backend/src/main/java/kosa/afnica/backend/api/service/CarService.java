package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.entity.Brand;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    // Brand 추가
    void insertBrand(MultipartFile file, Brand brand);

    // Brand 조회
    List<BrandResDto> getBrandList();


}
