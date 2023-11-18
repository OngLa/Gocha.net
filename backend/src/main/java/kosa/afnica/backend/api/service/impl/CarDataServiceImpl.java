package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.CarDataService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.entity.CarData;
import kosa.afnica.backend.db.mapper.CarDataMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CarDataServiceImpl implements CarDataService {

    private final CarDataMapper carDataMapper;

//    // 데이터 불러오기, 현대 API를 통해 데이터 불러오기
//    // 현대 측 Auth 문의중, 문의 해결되면 해당 코드 사용할 예정
//    private final WebClient carWebClient;
//
//    private final String[] carId = {
//            "6d97337b-eb53-467b-baf4-7faec6d7065e",
//            "3f979d64-1e57-4ead-90af-25da1756e206",
//            "ce7dfc88-f6b3-41ad-9099-4eb57bce4944",
//            "b23f1cd3-517c-4ac0-b574-cfc8eeca5fed",
//            "10cc6538-82b5-48aa-9d85-16416b8e07fb"
//    };
//    private final String[] uris = {
//            "/{carId}/dte",             // 주행 가능 거리
//            "/{carId}/odometer",        // 누적 운행 거리
//            "/{carId}/ev/charging",     // 전기차 충전 상태
//            "/{carId}/ev/battery",      // 전기차 배터리 잔량 조회
//            "/{carId}/lowFuel",         // 주유 경고등 상태 조회
//            "/{carId}/tirePressure",    // 타이어 공기압 경고등 상태
//            "/{carId}/lampWire",        // Lamp wire 경고등 상태
//            "/{carId}/washerFluid",     // 워셔액 경고등 상태
//            "/{carId}/breakOil",        // 브레이크 오일 경고등 상태
//            "/{carId}/engineOil"        // 엔진 오일 경고등 상태
//    };
//
//    @Override
//    public List<Object> createCarData(CarDataReqDto reqDto) {
//
//        List<Mono<Object>> monoList = Arrays.stream(uris)
//                .map(uri -> {
//                    UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance();
//                    URI completedUri = uriBuilder.path(uri).build(carId[0]);
//
//                    log.info(completedUri.toString());
//                    return callExternalApi(completedUri);
//                })
//                .collect(Collectors.toList());
//
//        return monoList.stream()
//                .map(mono -> {
//                    log.info(mono.toString());
//                    return mono.block();
//                })
//                .collect(Collectors.toList());
//    }
//
//    private Mono<Object> callExternalApi(URI uri) {
//        return carWebClient.get()
//                .uri(uri)
//                .retrieve()
//                .bodyToMono(Object.class);
//    }

    // 데이터 불러오기, 임시 난수 생성
    @Override
    public void createCarData(CarDataReqDto reqDto) {
        CarData carData = new CarData(reqDto);
        carDataMapper.saveCarData(carData);
    }

    @Override
    public CarDataResDto findAllCarDataByCarId(Long carId) {

        List<CarData> carDataList = carDataMapper.findAllCarDataByCarId(carId);
        if (carDataList.isEmpty()) {
            throw new CustomException(ErrorCode.CARDATA_NOT_FOUND);
        }

        return new CarDataResDto(carDataList.get(carDataList.size() - 1));
    }

}
