package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.car.CarTypeResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.CarType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cars")
@CrossOrigin("*")
public class CarController {

    private final CarService carService;

    @Operation(summary = "Brand 등록 API", description = "브랜드 등록 API - 홈페이지에서 보여주는 기능은 없음, 포스트맨으로 등록")
    @PostMapping(value = "/brand", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> postBrand(
            @RequestPart MultipartFile file,
            @RequestPart Brand brand
    ) {
        carService.createBrand(file, brand);

        return ResponseEntity.ok().build();
    }
    @Operation(summary = "Brand 불러오기 API", description = "브랜드 불러오기 API - 내 차량 등록 페이지 랜더링 시에 실행되는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = BrandResDto.class))))
    })
    @GetMapping("/brand")
    public ResponseEntity<List<BrandResDto>> getBrandList() {
        List<BrandResDto> resDtoList = carService.findAllBrand();

        return ResponseEntity.ok(resDtoList);
    }

    @Operation(summary = "CarTyoe 등록 API", description = "차 종류 등록 API - 홈페이지에서 보여주는 기능은 없음, 포스트맨으로 등록")
    @PostMapping(value = "/car-type", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> postCarType(
            @RequestPart MultipartFile file,
            @RequestPart CarType carType
    ) {
        carService.createCarType(file, carType);

        return ResponseEntity.ok().build();
    }
    @Operation(summary = "CarTyoe 불러오기 API", description = "차 종류 불러오기 API - 내 차량 등록 페이지 랜더링 시에 실행되는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = CarTypeResDto.class))))
    })
    @GetMapping("/car-type")
    public ResponseEntity<List<CarTypeResDto>> getCarTypeList(@RequestParam Long brandId) {
        List<CarTypeResDto> resDtoList = carService.findAllCarTypeByBrandId(brandId);

        return ResponseEntity.ok(resDtoList);
    }

}
