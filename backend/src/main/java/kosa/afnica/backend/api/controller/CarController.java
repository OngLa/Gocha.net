package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.entity.Brand;
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
    public ResponseEntity<Void> insertBrand(
            @RequestPart MultipartFile file,
            @RequestPart Brand brand
    ) {
        carService.insertBrand(file, brand);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/brand")
    @Operation(summary = "Brand 불러오기 API", description = "브랜드 불러오기 API - 내 차량 등록 페이지 랜더링 시에 실행되는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Brand.class))))
    })
    public ResponseEntity<List<BrandResDto>> getBrandList() {
        List<BrandResDto> resDtoList = carService.getBrandList();

        return ResponseEntity.ok(resDtoList);
    }

}
