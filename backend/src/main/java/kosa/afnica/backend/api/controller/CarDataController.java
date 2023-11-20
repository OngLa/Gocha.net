package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.CarDataService;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/car-data")
public class CarDataController {

    private final CarDataService carDataService;

    @Operation(summary = "챠량 데이터 저장 API", description = "챠량 데이터 저장 API - 현대 API 연동, 현재는 난수 데이터 생성, 하루에 데이터 하나만")
    @PostMapping()
    public ResponseEntity<Void> postCarData(@RequestBody CarDataReqDto reqDto) {
        carDataService.createCarData(reqDto);

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "Car ID 기반으로 등록된 최신 Car Data 불러오기 API", description = "Car Data 불러오기 API - 내 차 정보 페이지에 렌더링 시 호출될 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = CarDataResDto.class))),
            @ApiResponse(responseCode = "404", description = "차량 데이터가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/recent-data")
    public ResponseEntity<CarDataResDto> getRecentCarData(@RequestParam Long carId) {
        CarDataResDto resDto = carDataService.findRecentCarDataByCarId(carId);

        return ResponseEntity.ok(resDto);
    }

    @Operation(summary = "Car ID 기반으로 등록된 모든 Car Data 불러오기 API", description = "Car Data 불러오기 API - 차량 데이터 페이지 렌더링 시 호출될 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = CarDataResDto.class))),
            @ApiResponse(responseCode = "404", description = "차량 데이터가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/data-list")
    public ResponseEntity<List<CarDataResDto>> getCarDataList(@RequestParam Long carId, @RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate) {
        CarDataReqDto reqDto = new CarDataReqDto(carId, startDate, endDate);
        List<CarDataResDto> resDto = carDataService.findAllCarDataByCarId(reqDto);

        return ResponseEntity.ok(resDto);
    }
}
