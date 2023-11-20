package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.FcService;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import kosa.afnica.backend.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member/reservation/favoritecarcenter")
public class FcController {

    private final FcService fcService;

    //주정비소 등록
    @Operation(summary = "주 정비소 등록하기  API", description = "주정비소 등록하기 클릭시 해당 컴포넌트 데이터 서버로 이동")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = FcDto.class)))),
    })

    @PostMapping("")
    public void postFc(HttpServletRequest request, @RequestBody FcDto fcDto) {
        fcService.createFc(request, fcDto);
    }


    //주정비소 목록 출력
    @Operation(summary = "주 정비소목록 출력 API", description = "주 정비소 목록 출력시키는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Member.class)))),
    })
    @GetMapping("")
    public List<FcDto> getFc(HttpServletRequest request) {
        return fcService.readFc(request);
    }

    //주정비소 삭제
    @Operation(summary = "주 정비소 삭제  API", description = "주정비소 목록에서 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = FcDto.class)))),
    })
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        fcService.deleteFc(id);
    }
}
