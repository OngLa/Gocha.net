package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.FcDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface FcService {
//    주정비소 등록
    void createFc(HttpServletRequest request, FcDto fcDto);

    //주정비소 출력
    List<FcDto> readFc(HttpServletRequest request);

//    주정비소 삭제
    Long deleteFc(Long id);
}

