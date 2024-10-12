package fr.loicpincon.cron;

import fr.loicpincon.dao.repo.ActionTokenRepository;
import fr.loicpincon.dao.repo.TimeLineRepository;
import fr.loicpincon.dao.v2.ActionToken;
import fr.loicpincon.dao.v2.TimeLine;
import fr.loicpincon.notification.NotificationService;
import fr.loicpincon.notification.Type;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationPaymentDue {

	private final TimeLineRepository timeLineRepository;

	private final NotificationService notificationService;

	private final ActionTokenRepository actionTokenRepository;

	@Value("${front.url}")
	private String frontUrl;

	@Scheduled(cron = "0 0 10,16 * * *")
	@PostConstruct
	public void scan() {

		final LocalDateTime begin = LocalDate.now().atStartOfDay();
		final LocalDateTime end = begin.plusHours(23).plusMinutes(59).plusSeconds(59);

		final List<TimeLine> allByDueDateIsBetween = timeLineRepository.findAllByDueDateIsBetween(begin, end);
		if (allByDueDateIsBetween.isEmpty()) {
			log.info("No timeline to pay today");
		}
		for (TimeLine timeLine : allByDueDateIsBetween) {
			if (!timeLine.isPaid()) {
				ActionToken actionToken = new ActionToken();
				actionToken.setUuid(UUID.randomUUID());
				actionToken.setUse(false);
				actionToken.setCreated(LocalDateTime.now());
				actionTokenRepository.save(actionToken);
				StringBuilder stringBuilder = new StringBuilder();
				stringBuilder.append("Attention, il faut payer aujourdh'ui la prestation").append("\n");
				stringBuilder.append(timeLine.getCost().getName()).append(" ").append(timeLine.getCost().getSubName()).append("\n");
				stringBuilder.append("Le montant est de ").append(timeLine.getTotal());
				stringBuilder.append("<p>").append("Le montant est de ").append(timeLine.getTotal()).append("</p>");
				stringBuilder.append("<a href='" + frontUrl + "/site/actions/validate-payment?token=" + actionToken.getUuid().toString() + "'>Valider le paiement</a>");

				try {
					notificationService.send(Type.MAIL, "loic.pincon29@gmail.com", "", "", stringBuilder.toString());
				} catch (MessagingException e) {
					log.warn(stringBuilder.toString(), e);
					throw new RuntimeException(e);
				}
			}
		}

	}

}
