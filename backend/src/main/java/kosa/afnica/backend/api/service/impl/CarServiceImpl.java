package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.mapper.CarMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarMapper carMapper;

    @Override
    public void insertBrand(MultipartFile file, Brand brand) {

        // DB에 저장하기 위해 MultipartFile을 byte[]로 자료형 변경
        try {
            brand.setLogo(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // DB에 저장
        carMapper.insertBrand(brand);
    }

    @Override
    public List<BrandResDto> getBrandList() {

        // DB에서 Brand List 조회
        List<Brand> brandList = carMapper.getBrandList();

        // Brand List를 Dto로 담기
        List<BrandResDto> resDtoList = new ArrayList<>();
        for (Brand brand : brandList) {
            resDtoList.add(new BrandResDto(brand));
        }

        return resDtoList;
    }

}
