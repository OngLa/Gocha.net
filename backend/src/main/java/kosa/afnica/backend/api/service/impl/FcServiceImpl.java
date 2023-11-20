package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.FcService;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import kosa.afnica.backend.db.mapper.FcMapper;
import kosa.afnica.backend.db.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@Service
public class FcServiceImpl implements FcService {

    private final FcMapper fcMapper;
    private final ReservationMapper reservationMapper;

    public void createFc(HttpServletRequest request,  FcDto fcDto) {
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);
//헤더에서 데이터 파싱 이후 fcDto의 memeberID에 넣어준다
        fcDto.setMemberId(memberId);
        fcMapper.saveFc(fcDto);
    }
}
