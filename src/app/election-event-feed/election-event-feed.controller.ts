import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectionEventFeedService } from './election-event-feed.service';
import { CreateElectionEventFeedDto } from './dto/create-election-event-feed.dto';
import { UpdateElectionEventFeedDto } from './dto/update-election-event-feed.dto';

@Controller('election-event-feed')
export class ElectionEventFeedController {
  constructor(private readonly electionEventFeedService: ElectionEventFeedService) {}

  @Post()
  create(@Body() createElectionEventFeedDto: CreateElectionEventFeedDto) {
    return this.electionEventFeedService.create(createElectionEventFeedDto);
  }

  @Get()
  findAll() {
    return this.electionEventFeedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionEventFeedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectionEventFeedDto: UpdateElectionEventFeedDto) {
    return this.electionEventFeedService.update(+id, updateElectionEventFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionEventFeedService.remove(+id);
  }
}
