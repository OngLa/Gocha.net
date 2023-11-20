package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.FcService;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import kosa.afnica.backend.db.dto.reservation.ReservationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member/reservation/favoritecarcenter")
public class FcController {

    private final FcService fcService;

    @Operation(summary = "주 정비소 등록하기  API", description = "주정비소 등록하기 클릭시 해당 컴포넌트 데이터 서버로 이동")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationDto.class)))),
    })

    @PostMapping("")
    public void postFc(@RequestBody FcDto fcDto) {
        fcService.createFc(fcDto);
    }
    //주정비소 등록하는 api
}
