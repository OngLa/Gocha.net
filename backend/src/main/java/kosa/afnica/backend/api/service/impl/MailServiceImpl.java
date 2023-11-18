package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MailService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MailServiceImpl implements MailService {

    private final JavaMailSender emailSender;

    // 이메일 발송 -> 이메일 주소, 이메일 제목, 이메일 내용을 입력 받아 이메일 creataEmailForm() 메서드로 넘겨준다.
    public void sendEmail(String toEmail,
                          String title,
                          String text) {
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);
        try {
            emailSender.send(emailForm);
        } catch (RuntimeException e) {
            log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, title, text);
//            throw new CustomException(ErrorCode.UNABLE_TO_SEND_EMAIL);
        }
    }

    // 발신할 이메일 데이터 설정 -> 수신자 이메일 주소, 이메일 제목, 이메일 내용을 입력 받아 SimpleMailMessage 객체를 생성하여 반환
    public SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }
}
