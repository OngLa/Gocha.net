package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.FcService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.reservation.FcCarcenterDto;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import kosa.afnica.backend.db.mapper.FcMapper;
import kosa.afnica.backend.db.mapper.MemberMapper;
import kosa.afnica.backend.db.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FcServiceImpl implements FcService {

    private final FcMapper fcMapper;
    private final ReservationMapper reservationMapper;
    private final MemberMapper memberMapper;

    //주정비소 등록
    @Override
    public void createFc(HttpServletRequest request, FcDto fcDto) {
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);

        fcDto.setMemberId(memberId);

        if(fcMapper.findByMemberIdAndCarcenterId(fcDto).isPresent()) {
            // 카센터가 이미 등록 되어 있는경우
            throw new CustomException(ErrorCode.DUPLICATE_FC);
        } else {
            // 안된 경우
            fcMapper.saveFc(fcDto);
        }

    }

    //주정비소 목록 출력
    @Override
    public List<FcCarcenterDto> findFcListByMemberId(HttpServletRequest request) {
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);

        List<FcCarcenterDto> fcCarcenterDto =fcMapper.findCarcenterByMemberId(memberId);

        return fcCarcenterDto;
    }

    //주정비소 삭제
    public void deleteFc(Long id) {
        fcMapper.deleteById(id);
    }
}
