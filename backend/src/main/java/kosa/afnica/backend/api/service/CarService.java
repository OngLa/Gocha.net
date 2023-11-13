package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.entity.CarBrand;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    void insertBrand(MultipartFile file, CarBrand carBrand);

    List<CarBrand> getBrandList();


}
