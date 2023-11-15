package kosa.afnica.backend.api.service;

public interface MemberService {

    //FE에서 로그인한 멤버의 권한을 확인할 수 있도록 Role찾기
    String findRole(String email);

}
