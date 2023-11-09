package kosa.afnica.backend.api.member.service.impl;

import kosa.afnica.backend.api.member.service.MemberService;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;

}
