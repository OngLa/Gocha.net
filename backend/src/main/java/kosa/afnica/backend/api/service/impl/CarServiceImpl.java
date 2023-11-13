package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.db.entity.CarBrand;
import kosa.afnica.backend.db.mapper.CarMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarMapper carMapper;

    @Override
    public void insertBrand(MultipartFile file, CarBrand carBrand) {
        try {
            carBrand.setPhoto(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        carMapper.insertBrand(carBrand);
    }

    @Override
    public List<CarBrand> getBrandList() {

        return carMapper.getBrandList();
    }

}
