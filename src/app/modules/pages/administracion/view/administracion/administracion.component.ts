import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { createEventId, INITIAL_EVENTS } from 'src/app/core/utils';
import { DialogService } from 'primeng/dynamicdialog';
import { NuevoEventoComponent } from 'src/app/core/components/nuevo-evento/nuevo-evento.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
})
export class AdministracionComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');

    const ref = this.dialogService.open(NuevoEventoComponent, {
      header: 'Nuevo Evento',
      width: '400px',
      // modal: false,
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        selectInfo: selectInfo,
      },
    });

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    ref.onClose.subscribe((res: any) => {
      if (res) {
        calendarApi.addEvent(res);
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Car Selected',
        //   detail: 'Vin:' + car.vin,
        // });
      }
    });

    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}