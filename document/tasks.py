# Create your tasks here
from __future__ import absolute_import, unicode_literals
import time

# Django
from django.core.mail import send_mail

# App
from realtime.notify import NotificationManager

# Celery
from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task
def sleep_notify(session, message=None):
    logger.info('sleep_notify sleep 5')
    time.sleep(3)
    logger.info('sleep_notify awake')

    message = NotificationManager.notify_client(session)
    logger.info(message.send())


@shared_task
def send_email(email):
    logger.info(email)
    send_mail('Success', 'Sent from rufus', 'ubuntu@rufus.sprintcatalyst.com', [email], fail_silently=False)
