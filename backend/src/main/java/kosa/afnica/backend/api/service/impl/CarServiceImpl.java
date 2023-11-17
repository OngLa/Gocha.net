package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.car.CarReqDto;
import kosa.afnica.backend.db.dto.car.CarResDto;
import kosa.afnica.backend.db.dto.car.CarTypeResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.Car;
import kosa.afnica.backend.db.entity.CarType;
import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.mapper.CarMapper;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarMapper carMapper;
    private final MemberMapper memberMapper;

    @Override
    public void createBrand(MultipartFile file, Brand brand) {
        // DB에 저장하기 위해 MultipartFile을 byte[]로 자료형 변경
        try {
            brand.setLogo(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // DB에 저장
        carMapper.saveBrand(brand);
    }

    @Override
    public List<BrandResDto> findAllBrand() {
        // DB에서 Brand List 조회
        List<Brand> brandList = carMapper.findAllBrand();

        // Brand List를 Dto로 담기
        List<BrandResDto> resDtoList = new ArrayList<>();
        for (Brand brand : brandList) {
            resDtoList.add(new BrandResDto(brand));
        }

        return resDtoList;
    }

    @Override
    public void createCarType(MultipartFile file, CarType carType) {
        // DB에 저장하기 위해 MultipartFile을 byte[]로 자료형 변경
        try {
            carType.setLogo(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // DB에 저장
        carMapper.saveCarType(carType);
    }

    @Override
    public List<CarTypeResDto> findAllCarTypeByBrandId(Long brandId) {
        // DB에서 CarType List 조회
        List<CarType> carTypeList = carMapper.findAllCarTypeByBrandId(brandId);

        // CarType List를 Dto로 담기
        List<CarTypeResDto> resDtoList = new ArrayList<>();
        for (CarType carType : carTypeList) {
            resDtoList.add(new CarTypeResDto(carType));
        }

        return resDtoList;
    }

    @Override
    public Map<String, Long> createCar(HttpServletRequest request, CarReqDto reqDto) {
        // Token으로부터 Member 얻어오기
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));

        Member member = memberMapper.findByEmail(userEmail)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        // 내 차 등록
        Car car = new Car(reqDto, member.getId());
        carMapper.saveCar(car);

        // 등록된 차량 id 반환
        Map<String, Long> map = new HashMap<>();
        map.put("carId", car.getId());

        return map;
    }

    @Override
    public List<CarResDto> findAllCarByMemberId(HttpServletRequest request) {

        // Token으로부터 Member 얻어오기
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(userEmail)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        // MemberID로 부터 필요한 값 불러오기
        List<CarResDto> resDtoList = carMapper.findAllCarByMemberId(member.getId());

        // Byte -> String 으로 Base64 Encode
        for (CarResDto resDto : resDtoList) {
            resDto.setPhoto();
        }

        return resDtoList;
    }

}
